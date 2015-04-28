import org.json.simple.JSONAware;
import org.json.simple.JSONObject;

import java.util.UUID;

/**
 * Created by Victor on 27-Mar-15.
 */
public class Message implements JSONAware {
	private String username;
	private String text;
	private String time;
	private String id;
	private boolean edited;
	private boolean deleted;

	public Message() {
		username = "";
		text = "";
		time="";
		id = UUID.randomUUID().toString();
		edited = false;
		deleted = false;
	}

	public Message(String mess, String name, String time) {
		username = name;
		text = mess;
		this.time=time;
		id = UUID.randomUUID().toString();
		edited = false;
		deleted = false;
	}

	public String getUserName() {return username;}
	public void setUserName(String userName){username = userName;}
	public String getText() {return text;}
	public void setText(String text){this.text = text;}
	public String getTime() {return time;}
	public void setTime(String time){this.time = time;}
	public String getID() {return id;}
	public void setID(String id) {this.id = id;}
	public boolean isEdit(){return edited;}
	public void setEdit(boolean edited){this.edited = edited;}
	public boolean isDeleted(){return deleted;}
	public void setDeleted(boolean deleted){this.deleted = deleted;}


	public static Message parse(JSONObject obj) {
		Message temp = new Message();
		temp.username = (String) obj.get("username");
		temp.text = (String) obj.get("text");
		temp.time = (String) obj.get("time");
		temp.id = obj.get("id").toString();
		temp.edited = (Boolean) (obj.get("edited"));
		temp.deleted = (Boolean) (obj.get("deleted"));
		return temp;
	}

	public boolean deleteMessage() {
		if (!deleted) {
			edited = false;
			deleted = true;
			text = "";
			return true;
		}
		return false;
	}

	public boolean editMessage(String text) {
		if (!deleted) {
			edited = true;
			this.text = text;
			return true;
		}
		return false;
	}

	@Override
	public String toJSONString() {
		JSONObject obj = new JSONObject();
		obj.put("username", username);
		obj.put("text", text);
		obj.put("time",time);
		obj.put("id", id);
		obj.put("edited", edited);
		obj.put("deleted", deleted);
		return obj.toString();
	}

	@Override
	public String toString() {
		return username + " : " + text;
	}

	@Override
	public boolean equals(Object obj) {
		return (((Message) obj).getID() == id);
	}
}
