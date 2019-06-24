/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import wmengine.Managers.*;

/**
 *
 * @author ndfmac
 */
public class PermissionsServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ClassNotFoundException, SQLException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            HttpSession session = request.getSession(true);
            String caseType = request.getParameter("type").trim();
            String json = "";
            String json1 = "";
            String json2 = "";
            String result = "";
            switch (caseType) {
                case "GetBusinessPemissions": {
                    String usergroupid = request.getParameter("data");
                    int BizUserGroupID = Integer.parseInt(usergroupid);
                    HashMap<Integer, Object> PermsList = new HashMap<>();
                    String permissions = GeneralPermissionsManager.GetUserGroupPermIDS(BizUserGroupID);
                    String[] arr = permissions.split(",");
                    ArrayList<Integer> permissionIds = new ArrayList<>();
                    for (String ss : arr) {
                        String pid = ss.split("-")[1];
                        permissionIds.add(Integer.parseInt(pid));
                    }
                    if (!permissionIds.isEmpty()) {
                        for (int id : permissionIds) {
                            HashMap<String, Object> perms = GeneralPermissionsManager.GetPermissionDetails(id);
                            if (!perms.isEmpty()) {
                                PermsList.put(id, perms);
                            }
                        }
                        json = new Gson().toJson(PermsList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetUserPemissions": {
                    String userid = request.getParameter("data");
                    int UserID = Integer.parseInt(userid);
                    HashMap<Integer, Object> PermsList = new HashMap<>();
                    ArrayList<String> permissionIds = GeneralPermissionsManager.GetUserPermissions(UserID);
                    if (!permissionIds.isEmpty()) {
                        for (String id : permissionIds) {
                            int pid = Integer.parseInt(id);
                            HashMap<String, Object> perms = GeneralPermissionsManager.GetPermissionDetails(pid);
                            if (!perms.isEmpty()) {
                                PermsList.put(pid, perms);
                            }
                        }
                        json = new Gson().toJson(PermsList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "ClearBusinessStaffPermissions": {
                    String[] data = request.getParameterValues("data[]");
                    String staffuserid = data[0];
                    String businessid = data[1];
                    int StaffUserID = Integer.parseInt(staffuserid);
                    int BusinessUserID = Integer.parseInt(businessid);
                    result = GeneralPermissionsManager.ClearBusinessStaffPermissions(StaffUserID, BusinessUserID);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Clear Staff Permissions");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
//                case "GetUserGroupStaffPermissions": {
//                    String[] data = request.getParameterValues("data[]");
//                    String staffuserid = data[0];
//                    String businessid = data[1];
//                    int staffUserID = Integer.parseInt(staffuserid);
//                    int businessUserID = Integer.parseInt(businessid);
//                    HashMap<Integer, Object> PermsList = new HashMap<>();
//                    ArrayList<String> permissionIds = GeneralPermissionsManager.GetUserGroupStaffPermissions(staffUserID, businessUserID);
//                    if (!permissionIds.isEmpty()) {
//                        for (String id : permissionIds) {
//                            int pid = Integer.parseInt(id);
//                            HashMap<String, Object> perms = GeneralPermissionsManager.GetPermissionDetails(pid);
//                            if (!perms.isEmpty()) {
//                                PermsList.put(pid, perms);
//                            }
//                        }
//                        json = new Gson().toJson(PermsList);
//                    } else {
//                        json = new Gson().toJson("empty");
//                    }
//                    break;
//                }
                case "SetUserGroupStaffPermissions": {
                    String[] data = request.getParameterValues("data[]");
                    String staffuserid = data[0];
                    String businessid = data[1];
                    String permid = data[2];
                    String Action = data[3];//add or remove
                    int StaffUserID = Integer.parseInt(staffuserid);
                    int BusinessUserID = Integer.parseInt(businessid);
                    int PermID = Integer.parseInt(permid);
                    result = GeneralPermissionsManager.SetUserGroupStaffPermissions(StaffUserID, BusinessUserID, PermID, Action);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong OR permission has already been added, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Update Staff Permissions");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "AddRequestedPermission": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0];
                    String permName = data[1];
                    String permDesc = data[2];
                    int UserID = Integer.parseInt(userid);
                    result = GeneralPermissionsManager.AddRequestedPermission(UserID, permName, permDesc);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Request New Permission");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "GetUserRequestedPemissions": {
                    String userid = request.getParameter("data");
                    int BizUserID = Integer.parseInt(userid);
                    HashMap<Integer, Object> List = new HashMap<>();
                    ArrayList<Integer> IDs = GeneralPermissionsManager.GetRequestedPermissions(BizUserID);
                    if (!IDs.isEmpty()) {
                        for (int id : IDs) {
                            HashMap<String, String> perms = GeneralPermissionsManager.GetRequestedPermissionDetails(id);
                            if (!perms.isEmpty()) {
                                List.put(id, perms);
                            }
                        }
                        json = new Gson().toJson(List);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetUserRequestedChanges": {
                    String userid = request.getParameter("data");
                    int UserID = Integer.parseInt(userid);
                    HashMap<Integer, Object> List = new HashMap<>();
                    ArrayList<Integer> IDs = GeneralUserManager.GetRequestedChanges(UserID);
                    if (!IDs.isEmpty()) {
                        for (int id : IDs) {
                            HashMap<String, String> changes = GeneralUserManager.GetRequestedChangesDetails(id);
                            if (!changes.isEmpty()) {
                                List.put(id, changes);
                            }
                        }
                        json = new Gson().toJson(List);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                
            }
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(PermissionsServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(PermissionsServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(PermissionsServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(PermissionsServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
