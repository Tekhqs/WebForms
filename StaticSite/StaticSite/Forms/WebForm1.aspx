<%@ Page Language="C#" AutoEventWireup="true" CodeFile="WebForm1.aspx.cs" Inherits="Forms_WebForm1" %>

<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <div>
            <telerik:RadDropDownList ID="RadDropDownList1" runat="server" Skin="Metro">
                <Items>
                    <telerik:DropDownListItem Text="Item1" Value="Value1" Selected="true" />
                    <telerik:DropDownListItem Text="Item2" Value="Value2" />
                    <telerik:DropDownListItem Text="Item3" Value="Value3" />
                    <telerik:DropDownListItem Text="Item4" Value="Value4" />
                </Items>
            </telerik:RadDropDownList>
        </div>
    </form>
</body>
</html>
