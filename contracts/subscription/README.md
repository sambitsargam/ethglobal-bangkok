# Screenshot that uses own scroll devnet

<img width="868" alt="Screenshot 2024-11-17 at 4 44 30 AM" src="https://github.com/user-attachments/assets/31e14440-68ca-4f20-be4e-464c74b764ae">
<img width="1470" alt="Screenshot 2024-11-17 at 3 55 12 AM" src="https://github.com/user-attachments/assets/9e6851a1-5525-44c9-8b97-9bde1fe05b55">
<img width="756" alt="Screenshot 2024-11-17 at 4 27 40 AM" src="https://github.com/user-attachments/assets/6c8b25c9-109d-4c94-87a3-4a8cea10348e">
<img width="792" alt="Screenshot 2024-11-17 at 3 56 32 AM" src="https://github.com/user-attachments/assets/c6bf75e1-4ad4-4b96-9b4c-9cb101d20320">

* I am not able to deploy as the url not supporting in my mac . i tried but have not succed it giving error.

### **Feedback to Provide (Tailored for Scroll SDK Team):**

I followed the Scroll SDK Devnet guide for running a local chain, but I'm encountering DNS resolution issues. Specifically, querying `frontends.scrollsdk` via `nslookup` or `curl` fails with `NXDOMAIN` or `connection timed out`. 

Here are the observed symptoms:
1. `dig @192.168.49.2 frontends.scrollsdk` times out, even though the Minikube ingress IP is correctly set as `192.168.49.2`.
2. Running `kubectl get ingress` shows the expected domains (`frontends.scrollsdk` and others) correctly listed.
3. The `/etc/hosts` file contains accurate mappings for `192.168.49.2 frontends.scrollsdk` and other subdomains.
4. The DNS configuration file `/etc/resolver/minikube-scrollsdk` is set up with:
   ```
   domain scrollsdk
   nameserver 192.168.49.2
   search_order 1
   timeout 5
   ```

Despite these configurations:
- CoreDNS logs show no specific resolution activity for the `scrollsdk` domain.
- Connectivity checks to `192.168.49.2` using `ping` succeed, indicating the network is reachable.

**Steps Taken to Debug:**
1. Verified all services are running via `kubectl get pods` and `kubectl get ingress`.
2. Restarted CoreDNS and Minikube:
   ```bash
   kubectl delete pod -n kube-system -l k8s-app=kube-dns
   minikube stop && minikube start
   ```
3. Retested resolution with `nslookup` and `curl` after clearing DNS cache on macOS:
   ```bash
   sudo killall -HUP mDNSResponder
   ```
4. Confirmed that ingress-dns and ingress addons are enabled:
   ```bash
   minikube addons enable ingress
   minikube addons enable ingress-dns
   ```

