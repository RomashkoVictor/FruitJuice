/**
 * Created by Victor on 10-Feb-15.
 */
public class Component implements Comparable<Component>
{
	private String name;
	Component(String name)
	{
		this.name=name;
	}
	public String getName(){return name;}
	@Override
	public int compareTo(Component o)
	{
		return name.compareTo(o.name);
	}
	@Override
	public boolean equals(Object o)
	{
		return (name.compareTo(((Component)o).getName())==0);
	}
	public String toString()
	{
		return name;
	}
}