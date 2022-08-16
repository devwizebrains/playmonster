<?php

namespace App\ViewModels;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Statamic\View\ViewModel;

class Playbox extends ViewModel
{
  public function data(): array
  {
    $slides = collect($this->cascade->get('slide_rows')->raw())->pluck('slides')->collapse();

    $products = $slides->map(function ($slide) {
      if ($slide['type'] == 'product_gallery') {
        return collect($slide['products'])->filter(function ($product) use ($slide) {
          if (Arr::exists($product, 'activate_playbox')) {
            Log::debug(var_export($product, true));
            return data_get($product, 'activate_playbox', false) && data_get($slide, 'enabled', false);
          }
        })->map(function ($product) {
            return (object) array(
              'id' => $product['playbox_uuid'],
              'brand' => $this->cascade->get('title'),
              'brand_url' => $this->cascade->get('url'),
              'name' => $product['playbox_headline'] ?? $product['product_name'],
              'isGroup' => 'false',
              'groupCount' => ''
            );
        })->all();
      };
    })->filter()->flatten(1);


    $pb = $slides->map(function ($slide) {
        switch ($slide['type']) {
            case 'image':
              if (Arr::exists($slide, 'activate_playbox')) {
                return  ! empty($slide['activate_playbox']) && $slide['activate_playbox'] == true && ! empty($slide['enabled']) && $slide['enabled'] == true ? (object) array(
                    'id' => $slide['playbox_uuid'],
                    'brand' => $this->cascade->get('title'),
                    'brand_url' => $this->cascade->get('url'),
                    'name' => $slide['playbox_headline'] ?? $slide['slide_name'],
                    'isGroup' => 'false',
                    'groupCount' => ''
                  ) : null;
                }
                break;

            case 'html':
              if (Arr::exists($slide, 'activate_playbox')) {
                return  ! empty($slide['activate_playbox']) && $slide['activate_playbox'] == true && ! empty($slide['enabled']) && $slide['enabled'] == true ? (object) array(
                  'id' => $slide['playbox_uuid'],
                  'brand' => $this->cascade->get('title'),
                  'brand_url' => $this->cascade->get('url'),
                  'name' => $slide['playbox_headline'] ?? $slide['slide_name'],
                  'isGroup'=> 'false',
                  'groupCount'=> ''
                ) : null;
              }
                break;

            case 'slidedeck':
              if (Arr::exists($slide, 'activate_playbox')) {
                  return ! empty($slide['activate_playbox']) && $slide['activate_playbox'] == true && ! empty($slide['enabled']) && $slide['enabled'] == true ? (object) array(
                      'id' => $slide['playbox_uuid'],
                      'brand' => $this->cascade->get('title'),
                      'brand_url' => $this->cascade->get('url'),
                      'name' => $slide['playbox_headline'] ?? $slide['slide_name'],
                      'isGroup' => 'true',
                      'groupCount' => count($slide['slides'])
                  ) : null;
              }
                break;

            default:
                break;
        }
    })->filter()->values();

    return [
      'all_pb_items' => $pb->merge($products),
    ];

  }
}
