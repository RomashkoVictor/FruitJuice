import java.util.Comparator;
/**
 * Created by Victor on 10-Feb-15.
 */
public class Component
{
	private String name;
	static MyComparator comparator;
	{
		comparator=new MyComparator();
	}
	private static class MyComparator implements Comparator//перенести в другой класс
	{
		@Override
		public int compare(Object obj1,Object obj2)
		{
			return ((Component)obj1).component.compareTo(((Component)obj2).component);
		}
	}
	Component(String component)
	{
		this.component=component;
	}
	public static MyComparator getMyComparator()
	{
		return comparator;
	}
}
