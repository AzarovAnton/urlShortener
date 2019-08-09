<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Urls;
use App\Repository\UrlsRepository;

class RedirectController extends AbstractController
{
    /**
     * @Route("/{url}", name="redirect")
     */
    public function index($url)
    {

        $entityManager = $this->getDoctrine()->getManager();
        $result = $this->getDoctrine()->getRepository(Urls::class)->findByShortUrl($url);
        if($result){
            $result->setUsageCount( $result->getUsageCount() + 1 );
            $entityManager->flush();
            $url = $result->getUrl();
            if(substr_count($url, 'http://') || substr_count($url, 'https://')) :
                return $this->redirect($url);
            else :
                return $this->redirect('http://'.$url);
            endif;
        } else {
            return $this->redirect('/');
        }
    }
}
