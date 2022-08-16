<?php

namespace App\Console\Commands;

use App\Services\DownloadableAssetsGenerator;
use Illuminate\Console\Command;
use Statamic\Facades\Entry;

class GenerateDownloadableAssets extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:assets {entrySlug? : Entry slug to generate assets for. Regenerate for all entries if empty. }';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate downloadable assets';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $entrySlug = $this->argument('entrySlug');

        if(empty($entrySlug)) {
            $this->info('Entry slug not provided so generating assets for all entries ...');
            $this->regenerateForAllEntries();
        } else {
            $this->info('Generating assets for /' . $entrySlug . ' ...');
            $this->regenerateForAnEntry($entrySlug);
        }
    }

    public function regenerateForAllEntries()
    {
        $entries = Entry::whereCollection('brand_pages');
        foreach ($entries as $entry) {
            $this->info('Generating assets for "' . $entry->title . '"');
            DownloadableAssetsGenerator::generate($entry);
        }
    }

    public function regenerateForAnEntry($entrySlug)
    {
        $entry = Entry::findByUri('/' . $entrySlug);
        if(empty($entrySlug)) {
            Log::error('Entry not found for URI /' . $entrySlug);
            return false;
        }

        DownloadableAssetsGenerator::generate($entry);

    }

}
