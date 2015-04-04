import org.json.simple.JSONAware;
import org.json.simple.JSONObject;

/**
 * Created by Victor on 27-Mar-15.
 */
public class Message implements JSONAware {
	private String username;
	private String text;
	private int ID;
	private boolean edit;
	private boolean deleted;

	Message() {
		username = "User1";
		text = "";
		ID = (int) (Math.random() * 1000000);
		edit = false;
		deleted = false;
	}

	Message(String mess, String name) {
		username = name;
		text = mess;
		ID = (int) (Math.random() * 1000000);
		edit = false;
		deleted = false;
	}

	public void setID(int id) {ID = id;}

	public int getID() {return ID;}

	public String getUserName() {return username;}

	public String getText() {return text;}

	public static Message parse(JSONObject obj) {
		Message temp = new Message();
		temp.username = (String) obj.get("UserName");
		temp.text = (String) obj.get("Text");
		temp.ID = Integer.parseInt(obj.get("ID").toString());
		temp.edit = (Boolean) (obj.get("Edit"));
		temp.deleted = (Boolean) (obj.get("Deleted"));
		return temp;
	}

	public boolean deleteMessage() {
		if (!deleted) {
			edit = false;
			deleted = true;
			text = "This message has been deleted";
			return true;
		}
		return false;
	}

	public boolean editMessage(String text) {
		if (!deleted) {
			edit = true;
			this.text = text;
			return true;
		}
		return false;
	}

	@Override
	public String toJSONString() {
		JSONObject obj = new JSONObject();
		obj.put("UserName", username);
		obj.put("Text", text);
		obj.put("ID", ID);
		obj.put("Edit", edit);
		obj.put("Deleted", deleted);
		return obj.toString();
	}

	@Override
	public String toString() {
		return username + " : " + text;
	}

	@Override
	public boolean equals(Object obj) {
		return (((Message) obj).getID() == ID);
	}
}
