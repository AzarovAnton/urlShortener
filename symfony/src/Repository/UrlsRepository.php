<?php

namespace App\Repository;

use App\Entity\Urls;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Urls|null find($id, $lockMode = null, $lockVersion = null)
 * @method Urls|null findOneBy(array $criteria, array $orderBy = null)
 * @method Urls[]    findAll()
 * @method Urls[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UrlsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Urls::class);
    }

    // /**
    //  * @return Urls[] Returns an array of Urls objects
    //  */
    public function findByShortUrl($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.short_url = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    
    public function removeByDate($age)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.create_date < :val')
            ->delete()
            ->setParameter('val', $age)
            ->getQuery()
            ->execute()
        ;
    }
}
