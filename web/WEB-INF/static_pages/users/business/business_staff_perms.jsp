<%-- 
    Document   : business_staff_perms
    Created on : 11-Apr-2019, 15:26:44
    Author     : ndfmac
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<input type="hidden"  value="<%= session.getAttribute("StaffUserID")%>" id="StaffUserID"/>
<input type="hidden"  value="<%= session.getAttribute("StaffUserName")%>" id="StaffUserName"/>
<%@include file="../../../jspf/users/business/business_staff_permission.jspf" %>

