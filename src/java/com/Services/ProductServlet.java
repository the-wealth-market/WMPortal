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
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import wmengine.Managers.*;
import wmengine.Tables.Tables;

/**
 *
 * @author Saint
 */
public class ProductServlet extends HttpServlet {

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
            throws ServletException, IOException, ClassNotFoundException, SQLException, ParseException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            HttpSession session = request.getSession(true);
            String temp = "" + session.getAttribute("Id");
            String cart = "" + session.getAttribute("cart");
            String json = "";
            String json1 = "";
            String json2 = "";
            String type = request.getParameter("type").trim();
            String empty = "none";
            String result = "";
            switch (type) {
                case "GetAllProductCategories": {
                    ArrayList<Integer> topcatids = GeneralProductManager.GetProductCatIDs();
                    HashMap<Integer, HashMap<String, String>> catList = new HashMap<>();
                    HashMap<Integer, Object> TopCatSubs = new HashMap<>();
                    if (!topcatids.isEmpty()) {
                        for (int topcatid : topcatids) {
                            HashMap<String, String> topcatdetails = GeneralProductManager.GetProductCatDetails(topcatid);
                            catList.put(topcatid, topcatdetails);
                            ArrayList<Integer> subcatids = new ArrayList<>();
                            subcatids = GeneralProductManager.getTopCategory_SubCategories(topcatid, 0, 2);
                            if (!subcatids.isEmpty()) {
                                for (int subcatid : subcatids) {
                                    HashMap<String, String> subcatdetails = GeneralProductManager.GetProductCatDetails(subcatid);
                                    catList.put(subcatid, subcatdetails);
                                }
                            }
                            TopCatSubs.put(topcatid, subcatids);
                        }
                        json1 = new Gson().toJson(catList);
                        json2 = new Gson().toJson(TopCatSubs);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetUserOrderedProducts": {
                    String userid = request.getParameter("data");
                    ArrayList<Integer> HistIds = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> OrderedProdDetailsList = new HashMap<>();
                    int UserID = Integer.parseInt(userid);
                    HistIds = GeneralProductManager.GetSellerOrderHistoryProductIds(UserID);
                    if (!HistIds.isEmpty()) {
                        for (int hid : HistIds) {
                            HashMap<String, String> orderedDet = GeneralProductManager.GetOrderHistoryDetails(hid);
                            int orderID = GeneralProductManager.GetOrderIDByOrderHistoryID(hid);
                            String OrderStatus = GeneralProductManager.getOrderStatus(orderID);
                            String OrderNumber = GeneralProductManager.getOrderNumber(orderID);
                            orderedDet.put("OrderStatus", OrderStatus);
                            orderedDet.put("OrderNumber", OrderNumber);
                            int prodID = GeneralProductManager.GetProductIDByOrderHistoryID(hid);
                            HashMap<String, String> proddet = GeneralProductManager.GetProductDetails(prodID);
                            orderedDet.putAll(proddet);
                            OrderedProdDetailsList.put(hid, orderedDet);
                        }
                        json = new Gson().toJson(OrderedProdDetailsList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetFeaturedProducts": {
                    int count = 5;
                    ArrayList<Integer> prodIds = GeneralProductManager.GetRandomProducts();
                    ArrayList<Integer> proIds = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> ProdDetailsList = new HashMap<>();
                    if (!prodIds.isEmpty()) {
                        for (int id : prodIds) {
                            proIds.add(id);
                            HashMap<String, String> res = GeneralProductManager.GetProductDetails(id);
                            ProdDetailsList.put(id, res);
                        }
                        json = new Gson().toJson(ProdDetailsList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetTopDeals": {
                    ArrayList<Integer> prodIds = GeneralProductManager.GetRandomProducts();
                    ArrayList<Integer> proIds = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> ProdDetailsList = new HashMap<>();
                    if (!prodIds.isEmpty()) {
                        for (int i = 0; i < 4; i++) {
                            int id = prodIds.get(i);
                            proIds.add(id);
                            HashMap<String, String> res = GeneralProductManager.GetProductDetails(id);
                            ProdDetailsList.put(id, res);
                        }
                        json = new Gson().toJson(ProdDetailsList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetProductDetails": {
                    String[] data = request.getParameterValues("data[]");
                    String proIdstr = data[0].trim();
                    int proId = Integer.parseInt(proIdstr);
                    HashMap<String, String> res = GeneralProductManager.GetProductDetails(proId);
                    if (!res.isEmpty()) {
                        HashMap<Integer, String> category = GeneralProductManager.GetProductCategoryNames(proId);
                        int numOfreviews = GeneralReviewManager.GetNumberOfReviews(proId);
                        res.put("reviewNumber", "" + numOfreviews);
                        json = new Gson().toJson(res);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                
                case "GetProductMeasurementUnits": {
                    ArrayList<Integer> ids = GeneralProductManager.GetAllProductUnits("", 0, 1000);
                    HashMap<Integer, HashMap<String, String>> productUnits = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> details = GeneralProductManager.GetProductUnitsDetails(id);
                            productUnits.put(id, details);
                        }
                        json = new Gson().toJson(productUnits);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                
                case "GetProductHscodes": {
                    ArrayList<Integer> ids = GeneralProductManager.GetAllProductHscodes("", 0, 1000);
                    HashMap<Integer, HashMap<String, String>> productCodes = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> details = GeneralProductManager.GetProductHscodeDetails(id);
                            productCodes.put(id, details);
                        }
                        json = new Gson().toJson(productCodes);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                
                case "ListMemberProduct": {
                    String[] data = request.getParameterValues("data[]");
                    String useridstr = data[0].trim();
                    int userid = Integer.parseInt(useridstr);
                    String Name = data[1].trim();
                    int category = Integer.parseInt(data[2].trim());
                    String Summary = data[3].trim();
                    String Description = data[4].trim();
                    int quantity = Integer.parseInt(data[5].trim());
                    int price = Integer.parseInt(data[6].trim());
                    String properties = data[7].trim();
                    String ptags = data[8].trim();
                     String punit = data[9].trim();
                    String variants = data[10].trim();
                    int id = GeneralProductManager.listUserProduct(userid, Name, category, Summary, Description, quantity, price, properties, ptags, punit, variants);
                    json = new Gson().toJson(id);
                    break;
                }
                case "GetProducts": {
                    String[] data = request.getParameterValues("data[]");
                    String categoryID = data[0].trim();
                    String searchQuery = data[1].trim();
                    String countstr = data[2];
                    int count = Integer.parseInt(countstr);
                    int end = 1000;
                    ArrayList<Integer> ids = new ArrayList<>();
                    HashMap<String, ArrayList<String>> property_Value = new HashMap<>();
                    HashMap<Integer, HashMap<String, String>> Property_Value = new HashMap<>();
                    HashMap<Integer, HashMap<String, String>> ProductsList = new HashMap<>();
                    String category1;
                    String categoryDescription = "";
                    String cat;

                    int catId = Integer.parseInt(categoryID);
                    if (catId > 0) {
                        ids = GeneralCategoryManager.GetCategoryProductIds(catId, count, end);
                        category1 = GeneralCategoryManager.GetCategoryName(catId);
                        categoryDescription = GeneralCategoryManager.GetCategoryDescription(catId);
                    } else {
                        if (searchQuery.equals("null") || searchQuery.equals("")) {
                            searchQuery = "";
                            category1 = "All Products";
                        } else {
                            category1 = "Search Results for '" + searchQuery + "'";
                        }
                        ids = GeneralProductManager.GetProducts(searchQuery, count, end);
                    }
                    json1 = new Gson().toJson(category1);
                    json2 = new Gson().toJson(categoryDescription);
                    cat = "[" + json1 + "," + json2 + "]";
                    if (!ids.isEmpty()) {
                        ids.removeAll(Collections.singleton(0));
                        for (int id : ids) {
                            HashMap<String, String> res = GeneralProductManager.GetProductDetails(id);
                            ArrayList<String> values = new ArrayList<>();
                            HashMap<String, String> prod_prop_val = new HashMap<>();
                            String prop = res.get(Tables.ProductRecord.Properties);
                            String[] arr = prop.split(";");
                            for (String prop_val : arr) {
                                String properties = prop_val.substring(0, prop_val.indexOf("~"));
                                prod_prop_val.put(properties, prop_val.substring(prop_val.indexOf("~") + 1, prop_val.length()));
                                if (property_Value.containsKey(properties)) {
                                    ArrayList<String> value = property_Value.get(properties);
                                    value.add(prop_val.substring(prop_val.indexOf("~") + 1, prop_val.length()).trim());
                                    Set<String> hs = new HashSet<>();
                                    hs.addAll(value);
                                    value.clear();
                                    value.addAll(hs);
                                    property_Value.put(properties, value);
                                } else {
                                    values.add(prop_val.substring(prop_val.indexOf("~") + 1, prop_val.length()).trim());
                                    property_Value.put(properties, values);
                                }
                            }
                            ProductsList.put(id, res);
                            Property_Value.put(id, prod_prop_val);
                        }
                        String prop1 = new Gson().toJson(property_Value);
                        String prop2 = new Gson().toJson(Property_Value);
                        String prop = "[" + prop1 + "," + prop2 + "]";
                        String prods = new Gson().toJson(ProductsList);

                        json = "[" + cat + "," + prods + "," + prop + "]";
                    } else {
                        String none = new Gson().toJson(empty);
                        json = "[" + cat + "," + none + "," + none + "]";
                    }
                    break;
                }

                case "RemoveFromPool": {
                    String productid = request.getParameter("data");
                    int ProId = Integer.parseInt(productid);
                    result = GeneralProductManager.RemoveFromProductPool(ProId);
                    json = new Gson().toJson(result);
                    break;
                }
                case "GetUserProducts": {
                    ArrayList<Integer> proIds = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> ProdDetailsList = new HashMap<>();
                    String userid = request.getParameter("data");
                    int UserID = Integer.parseInt(userid);
                    proIds = GeneralProductManager.GetSellerProductIds(UserID);
                    if (!proIds.isEmpty()) {
                        for (int pid : proIds) {
                            HashMap<String, String> res = GeneralProductManager.GetPoolProductDetails(pid);
                            ProdDetailsList.put(pid, res);
                        }
                        json = new Gson().toJson(ProdDetailsList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                
                case "GetUserPendingProducts": {
                    ArrayList<Integer> proIds = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> ProdDetailsList = new HashMap<>();
                    String userid = request.getParameter("data");
                    int UserID = Integer.parseInt(userid);
                    proIds = GeneralProductManager.GetSellerPendingProductIds(UserID);
                    if (!proIds.isEmpty()) {
                        for (int pid : proIds) {
                            HashMap<String, String> res = GeneralProductManager.GetProductDetails(pid);
                            ProdDetailsList.put(pid, res);
                        }
                        json = new Gson().toJson(ProdDetailsList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                
                case "GetUserListedProducts": {
                    ArrayList<Integer> proIds = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> ProdDetailsList = new HashMap<>();
                    String userid = request.getParameter("data");
                    int UserID = Integer.parseInt(userid);
                    proIds = GeneralProductManager.GetSellerListedProductIds(UserID);
                    if (!proIds.isEmpty()) {
                        for (int pid : proIds) {
                            HashMap<String, String> res = GeneralProductManager.GetProductDetails(pid);
                            ProdDetailsList.put(pid, res);
                        }
                        json = new Gson().toJson(ProdDetailsList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }

                case "ListAndUnlistProduct": {
                    String[] params = request.getParameterValues("data");
                    String[] data = null;
                    for (String param : params) {
                        data = param.split(",");
                    }
                    String ActionType = data[0].trim();
                    String productid = data[1].trim();
                    int ProductID = Integer.parseInt(productid);
                    switch (ActionType) {
                        case "UnList":
                            result = GeneralProductManager.ListAndUnListProduct(ProductID, 0);
                            json1 = new Gson().toJson("UnListed");
                            json2 = new Gson().toJson(result);
                            json = "[" + json1 + "," + json2 + "]";
                            break;
                        case "List":
                            result = GeneralProductManager.ListAndUnListProduct(ProductID, 1);
                            json1 = new Gson().toJson("Listed");
                            json2 = new Gson().toJson(result);
                            json = "[" + json1 + "," + json2 + "]";
                            break;
                    }
                    break;
                }
                //****************** EBUKA ADDITIONS *********************************
                case "AddUserAddress": {
                    int lcdaid;
                    String[] data = request.getParameterValues("data[]");
                    String addresstype = data[0];
                    int stateid = Integer.parseInt(data[1].trim());
                    int lgaid = Integer.parseInt(data[2].trim());
                    String lcda1 = data[3].trim();
                    if("".equals(lcda1) || "Select LCDA".equals(lcda1) || "0".equals(lcda1)){
                        lcdaid = 0;
                    }else {
                        lcdaid = Integer.parseInt(lcda1);
                    }
                    int townid = Integer.parseInt(data[4].trim());
                    int bstopid = Integer.parseInt(data[5].trim());
                    int streetid = Integer.parseInt(data[6].trim());
                    String desc = data[7];
                    int userid = Integer.parseInt(data[8].trim());
                    result = GeneralProductManager.AddUserAddress(addresstype, stateid, lgaid, lcdaid, townid, bstopid, streetid, desc, userid);
                    json = new Gson().toJson(result);
                    break;
                }
                case "EditUserAddress": {
                    int lcdaid;
                    String[] data = request.getParameterValues("data[]");
                    String addresstype = data[0];
                    int stateid = Integer.parseInt(data[1].trim());
                    int lgaid = Integer.parseInt(data[2].trim());
                    String lcda1 = data[3].trim();
                    if("".equals(lcda1) || "Select LCDA".equals(lcda1) || "0".equals(lcda1)){
                        lcdaid = 0;
                    }else {
                        lcdaid = Integer.parseInt(lcda1);
                    }
                    int townid = Integer.parseInt(data[4].trim());
                    int bstopid = Integer.parseInt(data[5].trim());
                    int streetid = Integer.parseInt(data[6].trim());
                    String desc = data[7];
                    int addid = Integer.parseInt(data[8].trim());
                    result = GeneralProductManager.EditUserAddress(addresstype, stateid, lgaid, lcdaid, townid, bstopid, streetid, desc, addid);
                    json = new Gson().toJson(result);
                    break;
                }
                case "AddUserAddressFromGeoCode":{
                    String[] data = request.getParameterValues("data[]");
                    ArrayList<String> addressParams = new ArrayList<>();
                    String addresstype = data[0];
                    String state = data[1].trim();
                    String lga = data[2];
                    String lcda = data[3];
                    String town = data[4];
                    String neighborhood = data[5];
                    String street = data[6];
                    String desc = data[7];
                    int addid = Integer.parseInt(data[8].trim());
                    int[] ID = {157};
                    int stateId = GeneralProductManager.getAddressId(ID, "State", data[1].trim());
                    ID[0] = stateId;
                    int lgaId = GeneralProductManager.getAddressId(ID, "LGA", data[2].trim());
                    int[] Id = {stateId, lgaId};
                    int townID = GeneralProductManager.getAddressId(Id, "TownfromState", data[4].trim());
                    Id[0] = lgaId;
                    Id[1] = townID;
                    int BstopId = GeneralProductManager.getAddressId(Id, "BstopfromLGA", data[5].trim());
                    Id[0] = townID;
                    Id[1] = BstopId;
                    int streetId = GeneralProductManager.getAddressId(Id, "StreetfromTown", data[6].trim());
                    
                    result = GeneralProductManager.AddUserAddress(addresstype, stateId, lgaId, 0, townID, BstopId, streetId, desc, addid);
                    json = new Gson().toJson(result);
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
            Logger.getLogger(ProductServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(ProductServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(ProductServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(ProductServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(ProductServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(ProductServlet.class.getName()).log(Level.SEVERE, null, ex);
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
