function getUser(name: string) {
  let doc = CacheService.getDocumentCache()!;
  if(doc.get(name) != null) {
    try {
      let rt = JSON.parse(doc.get(name)!);
      rt["timestamp"] = new Date(rt["timestamp"]);
      let date = rt["timestamp"];
      
      // Store cache 7 days
      if(((new Date() as any) - date) < (new Date().getTime() + 604800))
        return rt;
    }
    catch {
      doc.remove(name);
    }
  }

  let url = applyOpts(baseUrl + "/get_user", addApiKey({
    "u": name,
    "m": 0
  }));

  let user = JSON.parse(UrlFetchApp.fetch(url).getContentText())[0];
  user["avatar_url"] = `http://s.ppy.sh/a/${user["user_id"]}`;
  user["timestamp"] = new Date();
  user["blank"] = "";

  doc.put(user["username"], JSON.stringify(user));

  return user;
}