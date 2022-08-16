<!doctype html>
<html lang="{{ app()->getLocale() }}" class="text-base antialiased">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Playbox Downloadable Generator</title>
    <link rel="stylesheet" href="{{ mix('css/site.css') }}">
  <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">

  </head>
  <body class="flex justify-center bg-gray-700">
    <div id="downloadable">
      {!! $template_content !!}
    </div>
    <script src="{{ mix('/js/site.js') }}"></script>
  </body>
</html>
