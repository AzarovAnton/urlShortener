<?php
namespace App\Controller;
 
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\View\View;
use AppBundle\Entity\User;
use App\Entity\Urls;
use App\Repository\UrlsRepository;
use Symfony\Component\Serializer\SerializerInterface;
/**
 * @Route("/api", name="api")
 */
class APIController extends FOSRestController
{
  private $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }
    /**
    * @Rest\Get("/urls")
    */
   public function getUrlList(UrlsRepository $repository)
   {
    $list = $repository->findAll();
    $result = $this->serializer->serialize($list, 'json');
        
    return new JsonResponse($result, 200, [], true);
   }
   /**
   * @Rest\Get("/urls/{shortUrl}")
   */
  public function getUrl($shortUrl, UrlsRepository $repository)
  {
   $response = $repository->findByShortUrl($shortUrl);
   $result = $this->serializer->serialize($response, 'json');
       
   return new JsonResponse($result, 200, [], true);
  }
  
  /**
  * @Rest\Post("/create_url")
  */
  public function createUrl(Request $request, UrlsRepository $repository)
  {
    
    $data = json_decode($request->getContent());
    if($data->url):
      if (!$data->shortUrl):
        $data->shortUrl = $this->randomString(5);
      endif;
      
      while($repository->findByShortUrl($data->shortUrl)):
        $data->shortUrl = $this->randomString(5);
      endwhile;

      $entityManager = $this->getDoctrine()->getManager();

      $url = new Urls();
      $url->setUrl($data->url);
      $url->setShortUrl($data->shortUrl);
      $url->setUserId(1);
      $url->setUsageCount(0);
      $url->setCreationDate(date_create(date('m/d/Y h:i:s a', time())));
      
      $entityManager->persist($url);
      $entityManager->flush();
      
      $response = $this->serializer->serialize($url, 'json');
    else:
      $response = 'error';
    endif;
        
    return new JsonResponse($response, 200, [], true);;
  }
  function randomString($length)
  {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randstring = '';
    for ($i = 0; $i < $length; $i++) {
        $randstring .= $characters[rand(0, strlen($characters)-1)];
    }
    return $randstring;
  }
}
