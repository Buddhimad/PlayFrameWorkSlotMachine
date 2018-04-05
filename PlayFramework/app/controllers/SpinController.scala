package controllers

import javax.inject.Inject

import play.api._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json.{JsArray, JsObject, Json}
import play.api.mvc.{Controller, _}
import play.modules.reactivemongo.json.collection.JSONCollection
import play.modules.reactivemongo.{MongoController, ReactiveMongoApi, ReactiveMongoComponents}
import reactivemongo.api.{Cursor, ReadPreference}

import scala.concurrent.Future
class SpinController @Inject() (val reactiveMongoApi: ReactiveMongoApi) extends Controller
with MongoController with ReactiveMongoComponents{

  def collection: JSONCollection = db.collection[JSONCollection]("score")

  import models.JsonFormats._
  import models._
  import reactivemongo.play.json._
  import play.modules.reactivemongo.json.collection._

  def create = Action.async(parse.json) { request =>

    request.body.validate[Score].map { post =>

      collection.insert(post).map { lastError =>
        Logger.debug(s"Successfully inserted with LastError: $lastError")
        Ok("")
      }
    }.getOrElse(Future.successful(BadRequest("invalid json")))
  }


  def findAll = Action.async {
    // let's do our query
    val cursor: Cursor[Score] = collection.find(Json.obj()).cursor[Score]

    // gather all the JsObjects in a list
    val futurePostsList: Future[List[Score]] = cursor.collect[List]()

    val futurePostsJsonArray: Future[JsArray] = futurePostsList.map { posts =>
      Json.arr(posts)
    }

    // everything's ok! Let's reply with the array
    futurePostsJsonArray.map { posts=>
      Ok(posts)
    }
  }
}
