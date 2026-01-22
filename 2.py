temp = eval(input('Enter a temperature in celsius: '))
print('In Fahrenheit, that is', 9/5*temp+32)
print('In Fahrenheit, that is', f_temp)
if f_temp > 212:
    print ('That temperature is above the boiling point.')
    if f_temp < 32:
        print('That temperature is below the freezing point.')
        
