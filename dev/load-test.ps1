# ping the given url for 20 seconds, wth a concurrency of 10, at 500ms per second
loadtest http://localhost:3000/ -t 20 -c 10 --rps 500