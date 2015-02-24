/**
 * Created by Victor on 10-Feb-15.
 */
public class FruitJuice {
	public static void main(String[] args) {
		ArrayOfJuices arrayOfJuices = new ArrayOfJuices();
		arrayOfJuices.input("juice.in");
		new Thread(arrayOfJuices).start();
		//new kunalgoritm().run();
		new Thread(null, new Kunalgoritm(arrayOfJuices.getJuices()), "", 16 * 1024 * 1024).start();
		//arrayOfJuices.outputComponents("juice1.out",arrayOfJuices.allComponentsWithoutRepeat());
	}
}
