import java.util.ArrayList;
/**
 * Created by Victor on 10-Feb-15.
 */
public class Juice
{
	private ArrayList<Component> ;
	public Juice()
	{
		juice=new ArrayList<Component>();
	}
	public void addComponent(String component)
	{
		juice.add(new Component(component));
	}
	public ArrayList<Component> getComponents()
	{
		return juice;
	}
}
