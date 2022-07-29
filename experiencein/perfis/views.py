from django.shortcuts import render, redirect
from perfis.models import Perfil, Convite
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from rest_framework.permissions import AllowAny


class PerfilViewSet(viewsets.ModelViewSet):
    queryset = Perfil.objects.all()
    serializers_class = None

    def get_serializers_class(self):
        if self.request.method == 'GET':
            return None
        return super().get_serializer_class()

    def get_permissions(self):
        if self.request.method == 'POST':
            return (AllowAny(),)
        return super().get_permissions()


@login_required
def index(request):
    return render(request, 'index.html', {'perfis': Perfil.objects.all(), 'perfil_logado': get_perfil_logado(request)})


@login_required
def exibir(request, perfil_id):
    perfil = Perfil.objects.get(id=perfil_id)

    perfil_logado = get_perfil_logado(request)
    ja_e_contato = perfil in perfil_logado.contatos.all()

    return render(request, 'perfil.html', {'perfil': perfil, "ja_e_contato": ja_e_contato})


@login_required
def convidar(request, perfil_id):
    perfil_a_convidar = Perfil.objects.get(id=perfil_id)
    perfil_logado = get_perfil_logado(request)
    perfil_logado.convidar(perfil_a_convidar)
    return redirect('index')


@login_required
def aceitar(request, convite_id):
    convite = Convite.objects.get(id=convite_id)
    convite.aceitar()
    return redirect('index')


@login_required
def get_perfil_logado(request):
    return request.user.perfil
