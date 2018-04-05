package models

import play.api.libs.json.Json

case class Score(name: String,credit:Int,bet:Int,result:String)
object  JsonFormats {
  implicit val postFormat=Json.format[Score]
}
