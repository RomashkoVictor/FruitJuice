/**
 * Created by Victor on 10-Feb-15.
 */
public class FruitJuice
{
	public static void main(String[] args)
	{
		ArrayOfJuices arrayOfJuices=new ArrayOfJuices();
		arrayOfJuices.input("arrays.in");
		new Thread(arrayOfJuices).start();
	}
}
