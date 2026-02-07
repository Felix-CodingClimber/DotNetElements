using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query;

namespace DotNetElements.AppFramework.EfCore;

public static class ModelBuilderExtensions
{
    // todo use .NET 10 named filters so that we can apply multiple filters to the same entity. Not tested yet.
    /// <summary>
    /// NOTE: This should be called once. If called multiple times, only the last filter will be applied.
    /// </summary>
    public static void ApplyGlobalFilters<TInterface>(this ModelBuilder modelBuilder, Expression<Func<TInterface, bool>> expression)
    {
        IEnumerable<Type> entities = modelBuilder.GetEntitiesFromBaseType<TInterface>();

        foreach (Type entity in entities)
        {
            ParameterExpression newParam = Expression.Parameter(entity);
            Expression newBody = ReplacingExpressionVisitor.Replace(expression.Parameters.Single(), newParam, expression.Body);
            modelBuilder.Entity(entity).HasQueryFilter(Expression.Lambda(newBody, newParam));
        }
    }

    // .NET 10 version:
    //public static void ApplyGlobalFilters<TInterface>(this ModelBuilder modelBuilder, Expression<Func<TInterface, bool>> expression, string? filterName = null)
    //{
    //    IEnumerable<Type> entities = modelBuilder.GetEntitiesFromBaseType<TInterface>();

    //    // Generate a filter name based on the interface if not provided
    //    filterName ??= $"Filter_{typeof(TInterface).Name}";

    //    foreach (Type entity in entities)
    //    {
    //        ParameterExpression newParam = Expression.Parameter(entity);
    //        Expression newBody = ReplacingExpressionVisitor.Replace(expression.Parameters.Single(), newParam, expression.Body);

    //        // Use named query filter - EF Core will automatically combine multiple filters with AND
    //        modelBuilder.Entity(entity).HasQueryFilter(filterName, Expression.Lambda(newBody, newParam));
    //    }
    //}

    //// todo check if needed. Not tested yet.
    //public static void ApplyGlobalInclude<TInterface, TProperty>(this ModelBuilder modelBuilder, Expression<Func<TInterface, TProperty>> expression) where TProperty : class
    //{
    //    IEnumerable<Type> entities = modelBuilder.GetEntitiesFromBaseType<TInterface>();

    //    foreach (Type entity in entities)
    //    {
    //        modelBuilder.Entity(entity).Navigation(((MemberExpression)expression.Body).Member.Name).AutoInclude();
    //    }
    //}

    //// todo check if needed. Not tested yet.
    //public static void ApplyGlobalDefaultSqlValue<TInterface, TProperty>(this ModelBuilder modelBuilder, Expression<Func<TInterface, TProperty>> expression, string sql)
    //{
    //    IEnumerable<Type> entities = modelBuilder.GetEntitiesFromBaseType<TInterface>();

    //    foreach (Type entity in entities)
    //    {
    //        modelBuilder.Entity(entity).Property(((MemberExpression)expression.Body).Member.Name).HasDefaultValueSql(sql);
    //    }
    //}

    private static IEnumerable<Type> GetEntitiesFromBaseType<TBase>(this ModelBuilder modelBuilder) => modelBuilder.Model
            .GetEntityTypes()
            .Where(type => type.BaseType is null)
            .Select(type => type.ClrType)
            .Where(type => typeof(TBase).IsAssignableFrom(type));
}
