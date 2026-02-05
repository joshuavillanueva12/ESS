#The list has four elements, indices start at 0 and end at 3
color_list = ["Red", "Blue", "Green", "Black"]
for c in color_list:
 print(c)
 for a in range(4):
  print(a)
  for a in range(2,7):
    print(a)
 for a in range(2,19,5):
  print(a)

numbers = (1, 2, 3, 4, 5, 6, 7, 8, 9) # Declaring the tuple
count_odd = 0
count_even = 0
for x in numbers:
 if x % 2:
   count_odd+=1
 else:
   count_even+=1
print("Number of even numbers :",count_even)
print("Number of odd numbers :",count_odd)

datalist = [1452, 11.23, 1+2j, True, 'w3resource', (0, -1), [5, 12],
{"class":'V', "section":'A'}]
for item in datalist:
 print ("Type of ",item, " is ", type(item))

 color = {"c1": "Red", "c2": "Green", "c3": "Orange"}
for key in color:
 print(key)
 color = {"c1": "Red", "c2": "Green", "c3": "Orange"}
for value in color.values():
 print(value)

 
