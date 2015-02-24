import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;

/**
 * Created by Victor on 16-Feb-15.
 */
public class Kunalgoritm implements Runnable {
	int num;
	ArrayList<ArrayList<Integer>> matrix;
	ArrayList<Integer> mt;
	ArrayList<Boolean> used;
	private ArrayList<Juice> arrayOfJuices;

	public Kunalgoritm(ArrayList<Juice> arrayOfJuices) {
		this.arrayOfJuices = arrayOfJuices;
	}

	public void outputNumberOfWashes(String file, int num) {
		try {
			PrintWriter out = new PrintWriter(new FileWriter(file));
			out.println(num);
			out.close();
		} catch (IOException e) {
			System.out.println("I/O error on file ");
			System.out.println("Error: " + e);
			return;
		}
	}

	public boolean try_kuhn(int v) {
		if (used.get(v) == true) return false;
		used.set(v, true);
		for (int i = 0; i < matrix.get((v)).size(); ++i) {
			int to = (matrix.get(v)).get(i);
			if ((mt.get(to) == -1) || try_kuhn(mt.get(to))) {
				mt.set(to, v);
				return true;
			}
		}
		return false;
	}

	public void createGraph() {
		Collections.sort(arrayOfJuices, ArrayOfJuices.getMyComparatorNumber());
		matrix = new ArrayList<ArrayList<Integer>>();
		for (int i = 0; i < arrayOfJuices.size(); i++) {
			matrix.add(new ArrayList<Integer>());
			for (int j = i + 1; j < arrayOfJuices.size(); j++) {
				if (arrayOfJuices.get(i).isSubJuiceOf(arrayOfJuices.get(j))) {
					matrix.get(i).add(j);
				}
			}
		}
	}

	public void run() {
		num = arrayOfJuices.size();
		createGraph();
		mt = new ArrayList<Integer>();
		used = new ArrayList<Boolean>();
		for (int i = 0; i < num; i++)
			mt.add(-1);
		for (int v = 0; v < num; ++v) {
			used.clear();
			for (int i = 0; i < num; i++)
				used.add(false);
			try_kuhn(v);
		}
		int res = 0;
		for (int i = 0; i < num; ++i)
			if (mt.get(i) != -1) res++;
		//System.out.println(arrayOfJuices.get(mt.get(i))+"<-"+arrayOfJuices.get(i));
		outputNumberOfWashes("juice3.out", num - res);
	}
}
