import java.util.ArrayList;
import java.util.TreeSet;

/**
 * Created by Victor on 10-Feb-15.
 */
public class Juice
{
	private TreeSet<Component> components;
	public Juice()
	{
		components=new TreeSet<Component>();
	}
	public String toString()
	{
		return components.toString();
	}
	public void addComponent(String component)
	{
		components.add(new Component(component));
	}
	public TreeSet<Component> getComponents()
	{
		return components;
	}
	public int getSize(){return components.size();}
	public boolean isSubJuiceOf(Juice obj)
	{
		return this.components.containsAll(obj.components);
	}
}
