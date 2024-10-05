<?php
$uri = "https://bootstrap-development-i.web.app";

$scss_directory = scandir(__DIR__ . DIRECTORY_SEPARATOR . "scss" . DIRECTORY_SEPARATOR);

foreach ($scss_directory as $scss => $bdirectory) {
    if ($bdirectory == "." || $bdirectory == ".." || is_file($bdirectory)) {
        continue;
    }

    echo "# " . $bdirectory;

    $order_directory = scandir(__DIR__ . DIRECTORY_SEPARATOR . "scss" . DIRECTORY_SEPARATOR . $bdirectory . DIRECTORY_SEPARATOR);

    foreach ($order_directory as $order => $odirectory) {
        if ($odirectory == "." || $odirectory == ".." || is_file($odirectory)) {
            continue;
        }

        echo PHP_EOL . "## " . $odirectory;

        $domain_directory = scandir(__DIR__ . DIRECTORY_SEPARATOR . "scss" . DIRECTORY_SEPARATOR . $bdirectory . DIRECTORY_SEPARATOR . $odirectory . DIRECTORY_SEPARATOR);

        foreach ($domain_directory as $domain => $ddirectory) {
            if ($ddirectory == "." || $ddirectory == ".." || is_file($ddirectory)) {
                continue;
            }

            echo PHP_EOL . "### " . $uri . "/" . "scss" . "/" . $bdirectory . "/" . $odirectory . "/" . $ddirectory;
        }
    }
    echo PHP_EOL;
}