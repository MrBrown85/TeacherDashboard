#!/usr/bin/env ruby
require 'webrick'
server = WEBrick::HTTPServer.new(
  Port: 8080,
  DocumentRoot: File.dirname(File.realpath(__FILE__))
)
trap('INT') { server.shutdown }
server.start
