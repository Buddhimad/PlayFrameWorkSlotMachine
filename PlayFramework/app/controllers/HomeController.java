package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Score;
import play.api.libs.json.Json;
import play.mvc.*;

import views.html.*;

import java.util.ArrayList;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller  {
    public static ArrayList<String>namelist=new ArrayList<>();

    public  Result index() {
        return ok(index.render("Your new application is ready."));
    }

    public Result addToList(){
        JsonNode json=request().body().asJson();


        return ok();
    }



}
