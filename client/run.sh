if [[ $1 == "-c" ]]; then
	tsc src/*.ts --outDir target/
fi

python -m http.server 8080
