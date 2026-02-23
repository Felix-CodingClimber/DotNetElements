import { EditorView, basicSetup } from 'codemirror';
import { EditorState, Compartment } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import { indentWithTab } from '@codemirror/commands';
import { keymap } from '@codemirror/view';
import { acceptCompletion, closeBrackets } from '@codemirror/autocomplete';
import { Decoration, ViewPlugin } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import { indentUnit } from '@codemirror/language';

// Scriban syntax highlighting using decorations
const scribanDecorators = [
    // Highlight {{ }} output expressions
    {
        regexp: /\{\{([^}]*)\}\}/g,
        decoration: Decoration.mark({ class: 'cm-scriban-output' }),
    },
    // Highlight {~ ~} tags
    {
        regexp: /\{~([^~]*)~\}/g,
        decoration: Decoration.mark({ class: 'cm-scriban-tag' }),
    },
    // Highlight {# #} comments
    {
        regexp: /\{#([^#]*)#\}/g,
        decoration: Decoration.mark({ class: 'cm-scriban-comment' }),
    },
];

// Highlight Scriban functions and their parameters
const scribanFunctionDecorators = [
    // Functions like string.capitalize, math.round, etc.
    {
        regexp: /\b(string|math|array|date|object|html|regex|timespan)\.\w+/g,
        decoration: Decoration.mark({ class: 'cm-scriban-function' }),
    },
    // Parameters (named and positional) - only after pipe + function
    // This matches the entire "| function params..." section and extracts parameters
    {
        regexp: /\|\s*(?:string|math|array|date|object|html|regex|timespan)\.\w+\s+((?:(?:\w+:\s*)?(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\d+\.?\d*|\b(?!if|for|else|end|in\b)\w+)(?:\s+|(?=\}\}|~\}|\|)))+)/g,
        decoration: Decoration.mark({ class: 'cm-scriban-function-param' }),
        captureGroup: 1,
        insideBracketsOnly: true,
    },
];

const editorFullSizeTheme = EditorView.theme({
    '&': {
        height: '100%'
    },
    '.cm-scroller': {
        overflow: 'auto',
        maxHeight: '100%'
    }
});

const scribanTheme = EditorView.baseTheme({
    // Dark theme styles
    '&dark .cm-scriban-output': {
        backgroundColor: 'rgba(86, 156, 214, 0.15)',
    },
    '&dark .cm-scriban-tag': {
        backgroundColor: 'rgba(197, 134, 192, 0.15)',
    },
    '&dark .cm-scriban-comment': {
        backgroundColor: 'rgba(106, 153, 85, 0.15)',
        color: '#6a9955',
        fontStyle: 'italic',
    },
    '&dark .cm-scriban-function': {
        color: '#dcdcaa',
        fontWeight: '600',
    },
    '&dark .cm-scriban-function-param': {
        color: '#ce9178',
    },

    // Light theme styles
    '&light .cm-scriban-output': {
        backgroundColor: 'rgba(0, 120, 215, 0.08)',
    },
    '&light .cm-scriban-tag': {
        backgroundColor: 'rgba(175, 0, 219, 0.08)',
    },
    '&light .cm-scriban-comment': {
        backgroundColor: 'rgba(0, 128, 0, 0.08)',
        color: '#008000',
        fontStyle: 'italic',
    },
    '&light .cm-scriban-function': {
        color: '#795e26',
        fontWeight: '600',
    },
    '&light .cm-scriban-function-param': {
        color: '#a31515',
    },
});

// VS Code Dark+ theme
const darkTheme = EditorView.theme({
    '&': {
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
    },
    '.cm-content': {
        caretColor: '#aeafad',
        fontFamily: 'Consolas, "Courier New", monospace',
        fontSize: '14px',
    },
    '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: '#aeafad'
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
        backgroundColor: '#264f78 !important',
    },
    '.cm-activeLine': {
        backgroundColor: 'transparent',
        boxShadow: 'inset 0 1px 0 0 #3e3e42, inset 0 -1px 0 0 #3e3e42',
    },
    '.cm-gutters': {
        backgroundColor: '#1e1e1e',
        color: '#858585',
        border: 'none',
    },
    '.cm-activeLineGutter': {
        backgroundColor: 'transparent',
    },
    '.cm-lineNumbers .cm-gutterElement': {
        color: '#858585',
    },
    // Autocomplete tooltip positioning
    '.cm-tooltip-autocomplete .cm-tooltip': {
        top: '0 !important',
    },
    // Scriban autocomplete tooltip - dark theme
    '.cm-scriban-tooltip': {
        padding: '8px 10px',
        maxWidth: '400px',
        fontFamily: 'Consolas, "Courier New", monospace',
        fontSize: '13px',
        lineHeight: '1.5',
    },
    '.cm-scriban-tooltip-title': {
        color: '#dcdcaa',
        fontWeight: '600',
        marginBottom: '6px',
    },
    '.cm-scriban-tooltip-description': {
        color: '#d4d4d4',
        marginBottom: '8px',
    },
    '.cm-scriban-tooltip-params-title': {
        color: '#569cd6',
        fontSize: '12px',
        fontWeight: '600',
        marginTop: '6px',
        marginBottom: '4px',
    },
    '.cm-scriban-tooltip-param': {
        color: '#d4d4d4',
        paddingLeft: '12px',
        marginBottom: '2px',
    },
    '.cm-scriban-tooltip-param-name': {
        color: '#9cdcfe',
        fontWeight: '500',
    },
    '.cm-scriban-tooltip-param-desc': {
        color: '#d4d4d4',
    },
}, { dark: true });

const darkHighlightStyle = HighlightStyle.define([
    { tag: t.comment, color: '#6a9955' },
    { tag: t.keyword, color: '#569cd6' },
    { tag: [t.string, t.special(t.brace)], color: '#ce9178' },
    { tag: t.number, color: '#b5cea8' },
    { tag: t.bool, color: '#569cd6' },
    { tag: t.null, color: '#569cd6' },
    { tag: t.operator, color: '#d4d4d4' },
    { tag: t.className, color: '#4ec9b0' },
    { tag: t.definition(t.typeName), color: '#4ec9b0' },
    { tag: t.typeName, color: '#4ec9b0' },
    { tag: t.angleBracket, color: '#808080' },
    { tag: t.tagName, color: '#569cd6' },
    { tag: t.attributeName, color: '#9cdcfe' },
    { tag: t.attributeValue, color: '#ce9178' },
    { tag: t.propertyName, color: '#9cdcfe' },
    { tag: t.variableName, color: '#9cdcfe' },
    { tag: t.function(t.variableName), color: '#dcdcaa' },
    { tag: t.definition(t.variableName), color: '#9cdcfe' },
]);

// VS Code Light+ theme
const lightTheme = EditorView.theme({
    '&': {
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    '.cm-content': {
        caretColor: '#000000',
        fontFamily: 'Consolas, "Courier New", monospace',
        fontSize: '14px',
    },
    '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: '#000000'
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
        backgroundColor: '#add6ff !important',
    },
    '.cm-activeLine': {
        backgroundColor: 'transparent',
        boxShadow: 'inset 0 1px 0 0 #d4d4d4, inset 0 -1px 0 0 #d4d4d4',
    },
    '.cm-gutters': {
        backgroundColor: '#f5f5f5',
        color: '#237893',
        border: 'none',
    },
    '.cm-activeLineGutter': {
        backgroundColor: 'transparent',
    },
    '.cm-lineNumbers .cm-gutterElement': {
        color: '#237893',
    },
    // Autocomplete tooltip positioning
    '.cm-tooltip-autocomplete .cm-tooltip': {
        top: '0 !important',
    },
    // Scriban autocomplete tooltip - light theme
    '.cm-scriban-tooltip': {
        padding: '8px 10px',
        maxWidth: '400px',
        fontFamily: 'Consolas, "Courier New", monospace',
        fontSize: '13px',
        lineHeight: '1.5',
    },
    '.cm-scriban-tooltip-title': {
        color: '#795e26',
        fontWeight: '600',
        marginBottom: '6px',
    },
    '.cm-scriban-tooltip-description': {
        color: '#000000',
        marginBottom: '8px',
    },
    '.cm-scriban-tooltip-params-title': {
        color: '#0000ff',
        fontSize: '12px',
        fontWeight: '600',
        marginTop: '6px',
        marginBottom: '4px',
    },
    '.cm-scriban-tooltip-param': {
        color: '#000000',
        paddingLeft: '12px',
        marginBottom: '2px',
    },
    '.cm-scriban-tooltip-param-name': {
        color: '#001080',
        fontWeight: '500',
    },
    '.cm-scriban-tooltip-param-desc': {
        color: '#000000',
    },
}, { dark: false });

const lightHighlightStyle = HighlightStyle.define([
    { tag: t.comment, color: '#008000' },
    { tag: t.keyword, color: '#0000ff' },
    { tag: [t.string, t.special(t.brace)], color: '#a31515' },
    { tag: t.number, color: '#098658' },
    { tag: t.bool, color: '#0000ff' },
    { tag: t.null, color: '#0000ff' },
    { tag: t.operator, color: '#000000' },
    { tag: t.className, color: '#267f99' },
    { tag: t.definition(t.typeName), color: '#267f99' },
    { tag: t.typeName, color: '#267f99' },
    { tag: t.angleBracket, color: '#800000' },
    { tag: t.tagName, color: '#800000' },
    { tag: t.attributeName, color: '#ff0000' },
    { tag: t.attributeValue, color: '#0000ff' },
    { tag: t.propertyName, color: '#ff0000' },
    { tag: t.variableName, color: '#001080' },
    { tag: t.function(t.variableName), color: '#795e26' },
    { tag: t.definition(t.variableName), color: '#001080' },
]);

const scribanPlugin = ViewPlugin.fromClass(class {
    decorations;

    constructor(view) {
        this.decorations = this.buildDecorations(view);
    }

    update(update) {
        if (update.docChanged || update.viewportChanged) {
            this.decorations = this.buildDecorations(update.view);
        }
    }

    buildDecorations(view) {
        const builder = [];
        const doc = view.state.doc;
        const text = doc.toString();

        // Find all Scriban syntax patterns (brackets)
        for (const { regexp, decoration } of scribanDecorators) {
            const re = new RegExp(regexp.source, regexp.flags);
            let match;
            while ((match = re.exec(text)) !== null) {
                const from = match.index;
                const to = from + match[0].length;
                builder.push(decoration.range(from, to));
            }
        }

        // Find Scriban functions (inside brackets only)
        for (const { regexp, decoration, captureGroup, insideBracketsOnly } of scribanFunctionDecorators) {
            const re = new RegExp(regexp.source, regexp.flags);
            let match;
            while ((match = re.exec(text)) !== null) {
                // Check if this match is inside Scriban brackets (only for items that need it)
                const matchPos = match.index;
                const beforeMatch = text.substring(0, matchPos);

                // Check for unclosed {{ or {~
                const lastOpenOutput = beforeMatch.lastIndexOf('{{');
                const lastCloseOutput = beforeMatch.lastIndexOf('}}');
                const lastOpenTag = beforeMatch.lastIndexOf('{~');
                const lastCloseTag = beforeMatch.lastIndexOf('~}');

                const inOutputBrackets = lastOpenOutput > lastCloseOutput;
                const inTagBrackets = lastOpenTag > lastCloseTag;

                const shouldHighlight = !insideBracketsOnly || inOutputBrackets || inTagBrackets;

                if (shouldHighlight) {
                    if (captureGroup && match[captureGroup]) {
                        // Highlight only the captured group (parameter)
                        const captureStart = match.index + match[0].indexOf(match[captureGroup]);
                        const captureEnd = captureStart + match[captureGroup].length;
                        builder.push(decoration.range(captureStart, captureEnd));
                    } else {
                        // Highlight the whole match (function name)
                        const from = match.index;
                        const to = from + match[0].length;
                        builder.push(decoration.range(from, to));
                    }
                }
            }
        }

        // Sort by position
        builder.sort((a, b) => a.from - b.from);

        return Decoration.set(builder);
    }
}, {
    decorations: v => v.decorations
});

// Parse variables object into flat completion list
function flattenVariables(obj, prefix = '', result = []) {
    for (const key in obj) {
        const fullPath = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];

        if (value && typeof value === 'object' && !Array.isArray(value)) {
            // Add the object itself
            result.push({
                label: fullPath,
                type: 'variable',
                info: 'object'
            });
            // Recurse into nested properties
            flattenVariables(value, fullPath, result);
        } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
            // Array of objects - add array and first element's properties
            result.push({
                label: fullPath,
                type: 'variable',
                info: 'array'
            });
        } else {
            // Primitive value
            const type = Array.isArray(value) ? 'array' : typeof value;
            result.push({
                label: fullPath,
                type: 'variable',
                info: type
            });
        }
    }
    return result;
}

// Detect loop context and return loop variables
function getLoopContext(text, position) {
    const textBeforePos = text.substring(0, position);

    // Find all {~ for ~} blocks that contain the current position
    const forLoopRegex = /\{~\s*for\s+(\w+)\s+in\s+([\w.]+)\s*~\}/g;
    const loops = [];
    let match;

    while ((match = forLoopRegex.exec(text)) !== null) {
        const loopStart = match.index;
        const loopVariable = match[1];
        const arrayPath = match[2];

        // Find corresponding {~ end ~}
        const afterLoop = text.substring(match.index + match[0].length);
        const endMatch = afterLoop.match(/\{~\s*end\s*~\}/);

        if (endMatch) {
            const loopEnd = match.index + match[0].length + endMatch.index;

            // Check if position is within this loop
            if (position >= loopStart && position <= loopEnd) {
                loops.push({ variable: loopVariable, arrayPath });
            }
        }
    }

    return loops;
}

// Generate loop variable properties based on array path
function getLoopVariableProperties(arrayPath, availableVariables) {
    const parts = arrayPath.split('.');
    let current = availableVariables;

    // Navigate to the array
    for (const part of parts) {
        if (current && current[part]) {
            current = current[part];
        } else {
            return [];
        }
    }

    // If it's an array with object elements, get properties from first element
    if (Array.isArray(current) && current.length > 0 && typeof current[0] === 'object') {
        return Object.keys(current[0]);
    }

    return [];
}

// Helper to get state from element
function getEditorState(element) {
    if (!element._scribanEditor) {
        throw new Error('Editor not initialized. Call initEditor first.');
    }
    return element._scribanEditor;
}

// Scriban completions function
function scribanCompletions(element, context) {
    const state = getEditorState(element);

    // Check if we're inside Scriban brackets
    const textBefore = context.state.doc.sliceString(Math.max(0, context.pos - 100), context.pos);
    const inScribanOutput = /\{\{[^}]*$/.test(textBefore);
    const inScribanTag = /\{~[^~]*$/.test(textBefore);

    if (!inScribanOutput && !inScribanTag) return null;

    const word = context.matchBefore(/[\w.]*/);
    if (!word) return null;

    const currentText = context.state.doc.toString();
    const position = context.pos;

    // Check if we're after a pipe character (for functions/filters)
    const textBeforeCursor = context.state.doc.sliceString(0, position);
    const lastOpenBracket = Math.max(
        textBeforeCursor.lastIndexOf('{{'),
        textBeforeCursor.lastIndexOf('{~')
    );
    const textInBrackets = textBeforeCursor.substring(lastOpenBracket);
    const afterPipe = /\|\s*[\w.]*$/.test(textInBrackets);

    let completions = [];

    if (afterPipe) {
        // After pipe: show only functions
        completions.push(...state.functions.map(func => {
            // Create custom info tooltip
            const createInfo = () => {
                const dom = document.createElement('div');
                dom.className = 'cm-scriban-tooltip';

                const title = document.createElement('div');
                title.className = 'cm-scriban-tooltip-title';
                title.textContent = func.name;
                dom.appendChild(title);

                const description = document.createElement('div');
                description.className = 'cm-scriban-tooltip-description';
                description.textContent = func.description;
                dom.appendChild(description);

                if (func.params && func.params.length > 0) {
                    const paramsTitle = document.createElement('div');
                    paramsTitle.className = 'cm-scriban-tooltip-params-title';
                    paramsTitle.textContent = 'Parameters:';
                    dom.appendChild(paramsTitle);

                    func.params.forEach(param => {
                        const paramDiv = document.createElement('div');
                        paramDiv.className = 'cm-scriban-tooltip-param';

                        const paramName = document.createElement('span');
                        paramName.className = 'cm-scriban-tooltip-param-name';
                        paramName.textContent = param.name;

                        const paramDesc = document.createElement('span');
                        paramDesc.className = 'cm-scriban-tooltip-param-desc';
                        paramDesc.textContent = ` - ${param.description}`;

                        paramDiv.appendChild(paramName);
                        paramDiv.appendChild(paramDesc);
                        dom.appendChild(paramDiv);
                    });
                }

                return dom;
            };

            return {
                label: func.name,
                type: 'function',
                info: createInfo
            };
        }));
    } else {
        // Before pipe: show variables and loop variables
        completions = flattenVariables(state.availableVariables);

        // Add loop variables if we're inside a loop
        const loops = getLoopContext(currentText, position);
        for (const loop of loops) {
            const properties = getLoopVariableProperties(loop.arrayPath, state.availableVariables);

            // Add loop variable itself
            completions.push({
                label: loop.variable,
                type: 'variable',
                info: 'loop variable'
            });

            // Add loop variable properties
            for (const prop of properties) {
                completions.push({
                    label: `${loop.variable}.${prop}`,
                    type: 'property',
                    info: 'loop item property'
                });
            }
        }
    }

    // Filter by prefix
    const prefix = word.text.toLowerCase();
    const filtered = prefix
        ? completions.filter(v => v.label.toLowerCase().includes(prefix))
        : completions;

    return {
        from: word.from,
        options: filtered.map(v => ({
            label: v.label,
            type: v.type,
            info: v.info,
        }))
    };
}

// Scriban Editor API
window.ScribanEditor = {
    // Initialize editor with a specific element
    initEditor(element) {
        // Destroy existing editor if present
        if (element._scribanEditor && element._scribanEditor.view) {
            element._scribanEditor.view.destroy();
        }

        // Initialize state on element
        element._scribanEditor = {
            view: null,
            availableVariables: {},
            functions: [],
            themeCompartment: new Compartment(),
            highlightCompartment: new Compartment()
        };

        const state = element._scribanEditor;

        // Create completion function bound to this element
        const scribanCompletionsInstance = (context) => {
            return scribanCompletions(element, context);
        };

        state.view = new EditorView({
            state: EditorState.create({
                doc: '',
                extensions: [
                    basicSetup,
                    html(),
                    closeBrackets(),
                    indentUnit.of('    '),
                    state.themeCompartment.of(darkTheme),
                    state.highlightCompartment.of(syntaxHighlighting(darkHighlightStyle)),
                    editorFullSizeTheme,
                    scribanTheme,
                    scribanPlugin,
                    html().language.data.of({
                        autocomplete: scribanCompletionsInstance,
                    }),
                    keymap.of([
                        { key: 'Tab', run: acceptCompletion },
                        indentWithTab,
                    ]),
                ],
            }),
            parent: element,
        });
    },

    // Set functions with documentation
    setScribanFunctions(element, functionsJson) {
        const state = getEditorState(element);
        if (typeof functionsJson === 'string') {
            state.functions = JSON.parse(functionsJson);
        } else {
            state.functions = functionsJson;
        }
    },

    // Set available variables
    setScribanVariables(element, variablesJson) {
        const state = getEditorState(element);
        if (typeof variablesJson === 'string') {
            state.availableVariables = JSON.parse(variablesJson);
        } else {
            state.availableVariables = variablesJson;
        }
    },

    // Get editor content
    getEditorContent(element) {
        const state = getEditorState(element);
        return state.view ? state.view.state.doc.toString() : '';
    },

    // Set editor content
    setEditorContent(element, content) {
        const state = getEditorState(element);
        if (state.view) {
            state.view.dispatch({
                changes: { from: 0, to: state.view.state.doc.length, insert: content }
            });
        }
    },

    // Switch theme
    setEditorTheme(element, theme) {
        const state = getEditorState(element);
        if (state.view) {
            const isDark = theme === 'dark';
            state.view.dispatch({
                effects: [
                    state.themeCompartment.reconfigure(isDark ? darkTheme : lightTheme),
                    state.highlightCompartment.reconfigure(syntaxHighlighting(isDark ? darkHighlightStyle : lightHighlightStyle))
                ]
            });
        }
    }
};
