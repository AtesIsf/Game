if [[ $1 == "-c" ]]; then
	tsc
fi

python -m http.server 8080
