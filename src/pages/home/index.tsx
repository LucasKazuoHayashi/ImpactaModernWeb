import React from "react";
import Head from "next/head";

import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { User } from "@/model/user";
import { userService } from "@/services/user.service";
import UserList from "@/components/user-list";
import { authService } from "@/services/auth.service";
import { Button } from "@mui/material";

export default function HomePage() {
  const router = useRouter();

  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(fetchUsers, []);

  function goToUser() {
    router.push("/user/0");
  }

  function treat(error: any) {
    if (authService.isUnauthorized(error)) {
      router.replace("login");
    } else {
      alert(error.message);
    }
  }

  function fetchUsers() {
    userService
      .getList()
      .then((list) => setUsers(list))
      .catch(treat);
  }

  function edit(id: number) {
    router.push(`/user/${id}`);
  }

  function remove(id: number) {
    userService
      .remove(id)
      .then((removed) => fetchUsers())
      .catch(treat);
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <main>
        <div className={styles.homeHeader}>
          <div>
            <Button variant="contained" onClick={() => router.replace("login")}>
              Sair
            </Button>
          </div>

          <h3>Listagem de Usuários</h3>

          <div>
            <Button variant="contained" onClick={goToUser}>
              Add
            </Button>
          </div>
        </div>

        <div className={styles.homeMain}>
          <UserList users={users} edit={edit} remove={remove} />
        </div>
      </main>
    </>
  );
}
