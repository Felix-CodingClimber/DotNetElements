export function afterStarted(blazor) {
    blazor.registerCustomEventType('textpaste', {
        browserEventName: 'paste',
        createEventArgs: event => {
            return {
                pastedData: event.clipboardData.getData('text')
            };
        }
    });
}