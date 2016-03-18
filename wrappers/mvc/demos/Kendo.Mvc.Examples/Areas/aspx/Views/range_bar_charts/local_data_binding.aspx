﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.RangeBarChartsLocalDataViewModel>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section k-content wide">
    <%= Html.Kendo().Chart(Model)
        .Name("chart")
        .Title(title => title
            .Text("Task Completeness")
        )
        .Legend(legend => legend
            .Visible(true)
            .Position(ChartLegendPosition.Top)
        )
        .Series(series =>
        {
            series.RangeBar(model => model.FromA, model => model.ToA).Name("Task A");
            series.RangeBar(model => model.FromB, model => model.ToB).Name("Task B");
        })
        .CategoryAxis(axis => axis
            .Categories(model => model.Day)
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis.Numeric()
            .Max(100)
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Template("#= value.from # - #= value.to #"))
    %>
</div>
</asp:Content>