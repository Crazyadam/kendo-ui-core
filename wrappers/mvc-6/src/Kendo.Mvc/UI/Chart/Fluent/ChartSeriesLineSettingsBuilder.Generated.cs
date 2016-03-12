using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesLineSettings
    /// </summary>
    public partial class ChartSeriesLineSettingsBuilder
        
    {
        /// <summary>
        /// The line color. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSeriesLineSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The line opacity. By default the line is opaque.
        /// </summary>
        /// <param name="value">The value for Opacity</param>
        public ChartSeriesLineSettingsBuilder Opacity(double value)
        {
            Container.Opacity = value;
            return this;
        }

        /// <summary>
        /// The line width in pixels.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartSeriesLineSettingsBuilder Width(string value)
        {
            Container.Width = value;
            return this;
        }

        /// <summary>
        /// Specifies the preferred line rendering style.
        /// </summary>
        /// <param name="value">The value for Style</param>
        public ChartSeriesLineSettingsBuilder Style(ChartLineStyle value)
        {
            Container.Style = value;
            return this;
        }

    }
}