/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Managers;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.HashMap;
import wmengine.Managers.DBManager;
import wmengine.Tables.Tables;

/**
 *
 * @author Saint
 */
public class AccountManager {

    public static int WealthMarketUserID = 1; // Assuming the wealth market id is 1 in account definition table.

    public AccountManager() {

    }

    public static HashMap<String, String> GetCurrentReflationRate() throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        HashMap<String, String> ref = DBManager.GetTableData(Tables.ReflationRates.Table, "where " + Tables.ReflationRates.Status + " = 'active'");
        return ref;
    }

    public static String AddUserPaymentCard(int UserID, String card, String year, String cvc, String month) throws SQLException, ClassNotFoundException, ParseException, UnsupportedEncodingException {
        String result = "";
        HashMap<String, Object> Data = new HashMap<>();
        Data.put(Tables.PaymentCardTable.UserID, UserID);
        Data.put(Tables.PaymentCardTable.CardNumber, card);
        Data.put(Tables.PaymentCardTable.CardYear, year);
        Data.put(Tables.PaymentCardTable.CardMonth, month);
        Data.put(Tables.PaymentCardTable.CardCVC, cvc);
        result = DBManager.insertTableData(Tables.PaymentCardTable.Table, Data, "");
        return result;
    }

    public static HashMap<String, String> getUserPaymentCard(int UserID) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        HashMap<String, String> ref = DBManager.GetTableData(Tables.PaymentCardTable.Table, "where " + Tables.PaymentCardTable.UserID + " = " + UserID);
        return ref;
    }

    public static int GetAgentUserIDByAgencyID(String AgencyID) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        int result = DBManager.GetInt(Tables.AgencyTable.UserID, Tables.AgencyTable.Table, "where " + Tables.AgencyTable.AgencyID + " = '" + AgencyID + "'");
        return result;
    }

}
