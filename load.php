<?php
/**
 * Created by PhpStorm.
 * User: boyan
 * Date: 2/24/2015
 * Time: 10:01 PM
 */
$data = [["title" => "Once uppon a time in the far galaxy far faaaar away", "author" => 'A. Beeson', "isbn" => '123123', "haveIt" => true],
    ["title" => "Book2", "author" => 'A. Beeson 2', "isbn" => '234234', "haveIt" => true]];


echo json_encode($data);