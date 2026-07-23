using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;

class Server
{
    static async Task Main(string[] args)
    {
        var port = 3000;
        var root = Directory.GetCurrentDirectory();
        var listener = new HttpListener();
        listener.Prefixes.Add($"http://localhost:{port}/");
        listener.Start();
        Console.WriteLine($"Server running at http://localhost:{port}/");
        Console.WriteLine($"Serving files from: {root}");
        Console.WriteLine("Press Ctrl+C to stop.");

        while (true)
        {
            var ctx = await listener.GetContextAsync();
            var path = ctx.Request.Url.LocalPath.TrimStart('/');
            if (string.IsNullOrEmpty(path)) path = "index.html";
            var filePath = Path.Combine(root, path);

            if (File.Exists(filePath))
            {
                var ext = Path.GetExtension(filePath).ToLower();
                var mime = ext switch
                {
                    ".html" => "text/html",
                    ".css"  => "text/css",
                    ".js"   => "application/javascript",
                    ".json" => "application/json",
                    ".png"  => "image/png",
                    ".jpg"  => "image/jpeg",
                    ".jpeg" => "image/jpeg",
                    ".gif"  => "image/gif",
                    ".svg"  => "image/svg+xml",
                    ".ico"  => "image/x-icon",
                    ".woff" => "font/woff",
                    ".woff2"=> "font/woff2",
                    _       => "application/octet-stream"
                };

                ctx.Response.ContentType = mime;
                ctx.Response.StatusCode = 200;
                var data = await File.ReadAllBytesAsync(filePath);
                ctx.Response.ContentLength64 = data.Length;
                await ctx.Response.OutputStream.WriteAsync(data, 0, data.Length);
            }
            else
            {
                ctx.Response.StatusCode = 404;
                var msg = System.Text.Encoding.UTF8.GetBytes("404 Not Found");
                ctx.Response.ContentType = "text/plain";
                await ctx.Response.OutputStream.WriteAsync(msg, 0, msg.Length);
            }
            ctx.Response.Close();
        }
    }
}
