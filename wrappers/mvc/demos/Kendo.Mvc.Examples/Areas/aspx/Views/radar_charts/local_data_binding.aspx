﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.ProteinScoreItem>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section k-content wide">
    <%= Html.Kendo().Chart(Model)
        .Name("chart")
        .Title(title => title
            .Text("Protein quality, Apple raw")
        )
        .Series(series =>
        {
            series.RadarColumn(
                model => model.Score
            )
            .Name("Proteins");
        })
        .CategoryAxis(axis => axis
            .Categories(model => model.Abbr)
        )
        .ValueAxis(axis => axis.Numeric()
            .Visible(false)
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
        )
        .Legend(legend => legend
            .Visible(false)
        )
    %>
</div>
</asp:Content>
