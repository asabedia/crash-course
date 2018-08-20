import pandas as pd
import sys

args = sys.argv

try:

	data=pd.read_csv(args[1])
	table=args[2]
	insert_stmt_i = """INSERT INTO %s(%s)
VALUES"""
	insert_data_i = "'%s'," * len(data.columns)
	insert_data_i = insert_data_i[:-1]
	insert_stmt_i += '(' + insert_data_i + ');'
	inserts = '\n'.join([insert_stmt_i % ((table, ', '.join(data.columns)) + tuple(data.loc[i])) for i in data.index])
	print(inserts)
except:
	print("3 arguments reuired in this order: csv filename, tablename. This assumes the csv has headers with the name of the required columns")

