
package com.kendoui.taglib.lineargauge;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ScaleLabelsTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ScaleTag parent = (ScaleTag)findParentWithClass(ScaleTag.class);


        parent.setLabels(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "linearGauge-scale-labels";
    }

    public void setBorder(com.kendoui.taglib.lineargauge.ScaleLabelsBorderTag value) {
        setProperty("border", value);
    }

    public void setMargin(com.kendoui.taglib.lineargauge.ScaleLabelsMarginTag value) {
        setProperty("margin", value);
    }

    public void setPadding(com.kendoui.taglib.lineargauge.ScaleLabelsPaddingTag value) {
        setProperty("padding", value);
    }

    public void setTemplate(ScaleLabelsTemplateFunctionTag value) {
        setEvent("template", value.getBody());
    }

    public java.lang.String getBackground() {
        return (java.lang.String)getProperty("background");
    }

    public void setBackground(java.lang.String value) {
        setProperty("background", value);
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public java.lang.String getFont() {
        return (java.lang.String)getProperty("font");
    }

    public void setFont(java.lang.String value) {
        setProperty("font", value);
    }

    public java.lang.String getFormat() {
        return (java.lang.String)getProperty("format");
    }

    public void setFormat(java.lang.String value) {
        setProperty("format", value);
    }

    public float getMargin() {
        return (Float)getProperty("margin");
    }

    public void setMargin(float value) {
        setProperty("margin", value);
    }

    public float getPadding() {
        return (Float)getProperty("padding");
    }

    public void setPadding(float value) {
        setProperty("padding", value);
    }

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

    public boolean getVisible() {
        return (Boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

//<< Attributes

}
