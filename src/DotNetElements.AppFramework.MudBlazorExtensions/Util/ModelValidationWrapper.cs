using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Components.Forms;

namespace DotNetElements.AppFramework.MudBlazorExtensions.Util;

public sealed class ModelValidationWrapper<TModel>
{
    public required TModel Model { get; init; }
    public EditContext EditContext { get; private init; }

    public bool IsValid { get; private set; } = true;
    public bool IsModified { get; private set; } = false;

    [SetsRequiredMembers]
    public ModelValidationWrapper(TModel model)
    {
        ArgumentNullException.ThrowIfNull(model);

        Model = model;
        EditContext = new EditContext(model);
    }

    public bool Validate()
    {
        IsValid = EditContext.Validate();

        return IsValid;
    }

    public bool UpdateIsModified(bool isExternalModified = false)
    {
        if (isExternalModified)
        {
            IsModified = true;

            return IsModified;
        }

        IsModified = EditContext.IsModified();

        return IsModified;
    }
}
