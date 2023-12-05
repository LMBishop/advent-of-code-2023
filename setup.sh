if [ ! -n "$1" ]; then 
    echo "Usage: $0 <day>"
    exit 1
fi
day=$(printf "%02d" $1)
source ./.env
mkdir $day
wget https://adventofcode.com/2023/day/$1/input -O ./$day/input --header="Cookie: session=$AOC_SESSION_COOKIE"
cp template.ts $day/index.ts

echo "Day $day: https://adventofcode.com/2023/day/$1"