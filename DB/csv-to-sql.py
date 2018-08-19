import pandas as pd
import sys

args = sys.argv

try:

	data=pd.read_csv(args[1])
	table=args[2]
	output=open(args[3], 'w')
	insert_stmt_i = """INSERT INTO %s(%s)
VALUES(%s);"""
	inserts = '\n'.join([insert_stmt_i % (table, ', '.join(data.columns), ', '.join(data.loc[i])) for i in data.index])
	output.write(inserts)
	output.close()
except:
	print("3 arguments reuired in this order: csv filename, tablename, output file. This assumes the csv has headers with the name of the required columns")

