<?php

namespace App\Http\Controllers;

use App\Jobs\GenerateBrandAssets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\Browsershot\Browsershot;
use Statamic\Facades\Asset;
use Statamic\Facades\Entry;
use Statamic\View\View;
use STS\ZipStream\ZipStreamFacade as Zip;

class PlayboxController extends Controller
{
    public function preview($brand)
    {
        $entry = Entry::findBySlug($brand, 'brand_pages');

        return (new View)
            ->template('playbox.preview')
            ->layout('playbox')
            ->with([
                'page' => $entry->toAugmentedArray(),
            ]);
    }

    public function generate($id)
    {
        $entry = Entry::find(Str::after($id, 'entry::'));
        GenerateBrandAssets::dispatch($entry);
    }

    private function generateShareableImage($playbox_uuid, $permalink)
    {
        Browsershot::url($permalink)
            ->select('#' . $playbox_uuid)
            ->setScreenshotType('jpeg', 100)
            ->windowSize(1600, 900)
            ->save(storage_path('app/public/' . $playbox_uuid . '.jpeg'));
    }

    public function create(Request $request)
    {
         ttt($request);
        $files    = $request->get('files');
        dd($files); 
        $filename = 'playbox' . now()->toDateTimeString() . '.zip';
        $zip      = Zip::create($filename);

        foreach ($files as $file) {
            if ($file['isGroup'] == 'true') {
                for ($i = 0; $i < $file['groupCount']; $i++) {
                    $zip->add($this->url($file['id'] . $i), $file['brand'] . '/' . $file['name'] . '/slide-' . $i . '.jpeg');
                }
            } else {
                $zip->add($this->url($file['id']), $file['brand'] . '/' . $file['name'] . '.jpeg');
            }
        }

        return $zip;
    }

    public function url($file)
    {
        $file = Asset::findByUrl('/storage/' . $file . '.jpeg');

        if (is_null($file)) {
            return;
        }

        return $file->url();
    }
}
