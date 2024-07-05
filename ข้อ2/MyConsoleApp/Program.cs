using System;

class Program
{
    static void Main(string[] args)
    {
        int number = 10;
        int zero = 0;
        int result = number / zero; // This will cause a runtime error (DivideByZeroException)
        Console.WriteLine(result);
    }
}