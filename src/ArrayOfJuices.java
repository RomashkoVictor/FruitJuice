import java.io.*;
import java.util.*;

/**
 * Created by Victor on 10-Feb-15.
 */
//распаралелить
public class ArrayOfJuices implements Runnable
{
	private ArrayList<Juice> arrayOfJuices;
	private ArrayList<Component> allComponentsWithoutRepeat;
	public ArrayList<Juice> getJuices(){return arrayOfJuices;}
	static MyComparatorNumber comparatorNumber;
	{
		comparatorNumber=new MyComparatorNumber();
	}
	private static class MyComparatorNumber implements Comparator
	{
		@Override
		public int compare(Object obj1,Object obj2)
		{
			return ((Juice)obj2).getSize() - ((Juice)obj1).getSize();
		}
	}
	public static MyComparatorNumber getMyComparatorNumber()
	{
		return comparatorNumber;
	}
	private static MyComparator comparator;
	{
		comparator=new MyComparator();
	}
	private static class MyComparator implements Comparator
	{
		@Override
		public int compare(Object obj1,Object obj2)
		{
			return ((Component)obj1).getName().compareTo(((Component) obj2).getName());
		}
	}
	public static MyComparator getMyComparator()
	{
		return comparator;
	}
	public ArrayOfJuices()
	{
		arrayOfJuices=new ArrayList<Juice>();
	}
	public void run()
	{
		sort(allComponentsWithoutRepeat);
		outputComponents("juice2.out",allComponentsWithoutRepeat);
	}
	public void input(String file)
	{
		try
		{
			String tempComponent;
			BufferedReader bf = new BufferedReader(new FileReader(file));
			TreeSet<String> containsComponents=new TreeSet<String>();
			allComponentsWithoutRepeat=new ArrayList<Component>();
			while (bf.ready())
			{
				StringTokenizer strToken=new StringTokenizer(bf.readLine()," ");
				if(strToken.hasMoreTokens())
				{
					Juice tempJuice=new Juice();
					while (strToken.hasMoreTokens())
					{
						tempComponent = strToken.nextToken();
						if (tempComponent.length() > 0)
						{
							tempJuice.addComponent(tempComponent);
							if(containsComponents.add(tempComponent))
							{
								allComponentsWithoutRepeat.add(new Component(tempComponent));
							}
						}
					}
					arrayOfJuices.add(tempJuice);
				}
			}
			outputComponents("juice1.out", allComponentsWithoutRepeat);
		} catch (FileNotFoundException e)
		{
			System.out.println("Failed to open file ");
			System.out.println("Error: " + e);
			return;
		} catch (IOException e)
		{
			System.out.println("I/O error on file ");
			System.out.println("Error: " + e);
			return;
		}
	}
//	public ArrayList<Component> allComponentsWithoutRepeat()//переделать
//	{
//		TreeSet<Component> containsComponents=new TreeSet<Component>();
//		ArrayList<Component> componentsNoRepeat=new ArrayList<Component>();
//		for(Juice juice:arrayOfJuices)
//		{
//			for(Component component:juice.getComponents())
//			{
//				if(containsComponents.add(component))
//				{
//					componentsNoRepeat.add(component);
//				}
//			}
//		}
//		return componentsNoRepeat;
//	}
	public void sort(ArrayList<Component> components)
	{
		components.sort(ArrayOfJuices.getMyComparator());
	}
	public void outputComponents(String file,ArrayList<Component> components)
	{
		try
		{
			PrintWriter out = new PrintWriter(new FileWriter(file));
			for(Component comp:components)
			{
				out.println(comp.getName());
			}
			out.close();
		}
		catch (IOException e)
		{
			System.out.println("I/O error on file ");
			System.out.println("Error: " + e);
			return;
		}
	}
}
