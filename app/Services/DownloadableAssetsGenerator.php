<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Spatie\Browsershot\Browsershot;
use Statamic\Facades\Entry;

class DownloadableAssetsGenerator
{
    public static function generate($entry)
    {
        $permalink = $entry->augmentedValue('permalink') . '/playbox';

        $slides = collect($entry->data()->get('slide_rows'))->pluck('slides')->collapse();

        $pb = $slides->map(function ($slide) {
            switch ($slide['type']) {
                case 'product_gallery':
                    return collect($slide['products'])->filter(function ($product) use ($slide) {
                        return data_get($product, 'activate_playbox', false) && data_get($slide, 'enabled', false);
                    })->pluck('playbox_uuid')->all();
                    break;

                case 'html':
                case 'image':
                    return ! empty($slide['activate_playbox']) && $slide['activate_playbox'] == true && ! empty($slide['enabled']) && $slide['enabled'] == true ? $slide['playbox_uuid'] : null;
                    break;

                case 'slidedeck':
                    if (! empty($slide['activate_playbox']) && $slide['activate_playbox'] == true && ! empty($slide['enabled']) && $slide['enabled'] == true) {
                        $slide_ids = [];
                        for ($i = 0; $i < count($slide['slides']); $i++) {
                            array_push($slide_ids, $slide['playbox_uuid'] . $i);
                        }

                        return $slide_ids;
                    }
                    break;

                default:
                    break;
            }
        })->filter()->flatten();

        $pb->map(function ($playbox_uuid) use ($permalink) {
            return self::generateShareableImage($playbox_uuid, $permalink);
        });

    }

    private static function generateShareableImage($playbox_uuid, $permalink)
    {
        try {
            Browsershot::url($permalink)
                ->select('#' . $playbox_uuid)
                ->setScreenshotType('jpeg', 100)
                ->windowSize(1600, 900)
                ->timeout(300)
                ->save(storage_path('app/public/' . $playbox_uuid . '.jpeg'));
        } catch (Exception $e) {
            echo 'BrowserShot Exception nr ' . $e->getCode() . ': "' . $e->getMessage() . '"';
            Log::error('BrowserShot Exception nr ' . $e->getCode() . ': "' . $e->getMessage() . '"');
        }
    }
}
