import java.io.*;
import java.util.ArrayList;
import java.util.StringTokenizer;

/**
 * Created by Victor on 10-Feb-15.
 */
//распаралелить
public class ArrayOfJuices implements Runnable
{
	private ArrayList<Juice> arrayOfJuices;
	public ArrayOfJuices()
	{
		arrayOfJuices=new ArrayList<Juice>();
	}
	public void run()
	{
		sort();
		outputSortedComponents("juice2.out");
	}
	public void input(String file)
	{
		try
		{
			String tempComponent;
			BufferedReader bf = new BufferedReader(new FileReader(file));
			while (bf.ready())
			{
				StringTokenizer strToken=new StringTokenizer(bf.readLine()," ");
				while(strToken.hasMoreTokens())
				{
					tempComponent=strToken.nextToken();
					if(tempComponent.length()>0)
					{

					}
				}
			}
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
	public synchronized void sort()
	{
		arrayOfJuices.sort(Component.getMyComparator());
	}
	public synchronized void outputComponents(String file)
	{
		try
		{
			PrintWriter out = new PrintWriter(new FileWriter(file));

			out.close();
		}
		catch (IOException e)
		{
			System.out.println("I/O error on file ");
			System.out.println("Error: " + e);
			return;
		}
	}
	public synchronized void outputSortedComponents(String file)
	{
		try
		{
			PrintWriter out = new PrintWriter(new FileWriter(file));

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
