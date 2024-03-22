function DayInYear(n)
{
    if(n % 4 == 0)
    {
        if(n % 100 == 0 && n % 400 != 0)
        {
            return 365;
        }
        return 366;
    }
    else
    {
        return 365;
    }       
}
console.log('DayInYear(1991)',DayInYear(1991));
console.log('DayInYear(2000)',DayInYear(2000));
console.log('DayInYear(2004)',DayInYear(2004));
console.log('DayInYear(1900)',DayInYear(1900));
