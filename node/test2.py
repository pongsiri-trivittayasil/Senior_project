b = [2,3,4,2,5,3,2]
c= ["66666jiw","66666bom"]

a = [i for i,x in enumerate(c) if "jiw" in x]

print a
print c[a[0]]  # C[1]
# a = [i for i,x in enumerate(c) if x=="2"]

