package pe.lacafetalab.pao.auth.user.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJpaRepository extends JpaRepository<UserDao, String> {
}
